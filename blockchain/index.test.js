const Block = require('./block');
const Blockchain = require('.');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('starts with genisis block', () => {
        expect(bc.chain[0]).toEqual(Block.genisis());
    });

    it('adds a new block', () => {
        const newData = 'foo';
        bc.addBlock(newData);

        expect(bc.chain[bc.chain.length-1].data).toEqual(newData);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('foo');
        
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genisis block', () => {
        bc2.chain[0].data = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a currpt chain', () => {
        bc2.addBlock('foo')
        bc2.chain[1].data = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less or equal lengths', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });


} );