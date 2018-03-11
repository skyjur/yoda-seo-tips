import * as assert from 'assert';
import validate, {mustHaveElement} from './index';
import {outputStub} from './validatorTest';

describe('index test', () => {
    it('default rules', async () => {
        let out = outputStub();
        await validate('sample1.html', out);
        assert.equal(out.get(), '');
    });

    it('default rules with settings', async () => {
        let out = outputStub();
        await validate('sample1.html', out, {maxStrongTags: 2});
        assert.equal(out.get(), '3 <strong> tags I count. More than 2 should be not.\n');
    });

    it('custom rules', async () => {
        let out = outputStub();
        await validate('sample1.html', out, [
            mustHaveElement('section', () => 'error1')
        ]);
        assert.equal(out.get(), 'error1\n');
    });
})