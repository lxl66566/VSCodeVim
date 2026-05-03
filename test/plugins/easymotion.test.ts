import { strict as assert } from 'assert';

import { EasyMotion } from '../../src/actions/plugins/easymotion/easymotion';
import {
  buildTriggerKeys,
  EasymotionTrigger,
} from '../../src/actions/plugins/easymotion/easymotion.cmd';
import { newTest } from '../testSimplifier';
import { setupWorkspace } from './../testUtils';

function easymotionCommand(trigger: EasymotionTrigger, searchWord: string, jumpKey: string) {
  return [...buildTriggerKeys(trigger), searchWord, jumpKey].join('');
}

suite('easymotion isPinyinMatch', () => {
  const em = new EasyMotion();
  /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  const match = (line: string, index: number, search: string, pinyin = true, ignorecase = true) =>
    (em as any).isPinyinMatch(line, index, search, ignorecase, pinyin);
  /* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

  test('direct character match returns match length', () => {
    assert.strictEqual(match('abc', 0, 'a'), 1);
    assert.strictEqual(match('abc', 1, 'bc'), 2);
  });

  test('no match returns 0', () => {
    assert.strictEqual(match('abc', 0, 'x'), 0);
  });

  test('case-insensitive match', () => {
    assert.strictEqual(match('AbC', 0, 'a', true, true), 1);
    assert.strictEqual(match('AbC', 0, 'a', true, false), 0);
  });

  test('pinyin first-letter match for Chinese character', () => {
    assert.strictEqual(match('你好', 0, 'n'), 1);
    assert.strictEqual(match('你好', 1, 'h'), 1);
  });

  test('pinyin disabled returns 0 for Chinese characters', () => {
    assert.strictEqual(match('你好', 0, 'n', false), 0);
  });

  test('mixed Chinese and ASCII match', () => {
    assert.strictEqual(match('a你好b', 0, 'an'), 2);
    assert.strictEqual(match('a你好b', 1, 'nh'), 2);
  });

  test('index out of bounds returns 0', () => {
    assert.strictEqual(match('ab', 2, 'a'), 0);
  });
});

suite('easymotion plugin', () => {
  suiteSetup(async () => {
    await setupWorkspace({
      config: { easymotion: true },
    });
  });

  newTest({
    title: 'Can handle s move',
    start: ['a|bcdabcd'],
    keysPressed: easymotionCommand({ key: 's' }, 'a', 'k'),
    end: ['|abcdabcd'],
  });

  newTest({
    title: 'Can handle 2s move',
    start: ['ab|cdabcd'],
    keysPressed: easymotionCommand({ key: '2s' }, 'ab', 'k'),
    end: ['|abcdabcd'],
  });

  newTest({
    title: 'Can handle f move',
    start: ['a|bcdabcdabcd'],
    keysPressed: easymotionCommand({ key: 'f' }, 'a', 'k'),
    end: ['abcdabcd|abcd'],
  });

  newTest({
    title: 'Can handle 2f move',
    start: ['a|bcdabcdabcd'],
    keysPressed: easymotionCommand({ key: '2f' }, 'ab', 'k'),
    end: ['abcdabcd|abcd'],
  });

  newTest({
    title: 'Can handle F move',
    start: ['abcdabc|dabcd'],
    keysPressed: easymotionCommand({ key: 'F' }, 'a', 'k'),
    end: ['|abcdabcdabcd'],
  });

  newTest({
    title: 'Can handle 2F move',
    start: ['abcdabc|dabcd'],
    keysPressed: easymotionCommand({ key: '2F' }, 'ab', 'k'),
    end: ['|abcdabcdabcd'],
  });

  newTest({
    title: 'Can handle t move',
    start: ['abcd|abcdabcd'],
    keysPressed: easymotionCommand({ key: 't' }, 'c', 'k'),
    end: ['abcdabcda|bcd'],
  });

  newTest({
    title: 'Can handle bd-t move',
    start: ['abcd|abcdabcd'],
    keysPressed: easymotionCommand({ key: 'bdt', leaderCount: 3 }, 'c', 'k'),
    end: ['a|bcdabcdabcd'],
  });

  newTest({
    title: 'Can handle 2t move',
    start: ['abcd|abcdabcd'],
    keysPressed: easymotionCommand({ key: '2t' }, 'cd', 'k'),
    end: ['abcdabcda|bcd'],
  });

  newTest({
    title: 'Can handle bd-t2 move',
    start: ['abcd|abcdabcd'],
    keysPressed: easymotionCommand({ key: 'bd2t', leaderCount: 3 }, 'cd', 'k'),
    end: ['a|bcdabcdabcd'],
  });

  newTest({
    title: 'Can handle T move',
    start: ['abcdab|cdabcd'],
    keysPressed: easymotionCommand({ key: 'T' }, 'a', 'k'),
    end: ['a|bcdabcdabcd'],
  });

  newTest({
    title: 'Can handle 2T move',
    start: ['abcdabc|dabcd'],
    keysPressed: easymotionCommand({ key: '2T' }, 'ab', 'k'),
    end: ['ab|cdabcdabcd'],
  });

  newTest({
    title: 'Can handle w move',
    start: ['abc |def ghi jkl'],
    keysPressed: easymotionCommand({ key: 'w' }, '', 'k'),
    end: ['abc def ghi |jkl'],
  });

  newTest({
    title: 'Can handle bd-w move',
    start: ['abc |def ghi jkl'],
    keysPressed: easymotionCommand({ key: 'bdw', leaderCount: 3 }, '', 'k'),
    end: ['|abc def ghi jkl'],
  });

  newTest({
    title: 'Can handle b move',
    start: ['abc def |ghi jkl'],
    keysPressed: easymotionCommand({ key: 'b' }, '', 'k'),
    end: ['|abc def ghi jkl'],
  });

  newTest({
    title: 'Can handle e move',
    start: ['abc |def ghi jkl'],
    keysPressed: easymotionCommand({ key: 'e' }, '', 'k'),
    end: ['abc def ghi jk|l'],
  });

  newTest({
    title: 'Can handle bd-e move',
    start: ['abc |def ghi jkl'],
    keysPressed: easymotionCommand({ key: 'bde', leaderCount: 3 }, '', 'k'),
    end: ['ab|c def ghi jkl'],
  });

  newTest({
    title: 'Can handle ge move',
    start: ['abc def |ghi jkl'],
    keysPressed: easymotionCommand({ key: 'ge' }, '', 'k'),
    end: ['ab|c def ghi jkl'],
  });

  newTest({
    title: 'Can handle n-char move',
    start: ['abc |def ghi jkl', 'abc def ghi jkl'],
    keysPressed: easymotionCommand({ key: '/' }, 'ghi\n', 'k'),
    end: ['abc def ghi jkl', 'abc def |ghi jkl'],
  });

  newTest({
    title: 'Can handle j move',
    start: ['abc', 'd|ef', 'ghi', 'jkl'],
    keysPressed: easymotionCommand({ key: 'j' }, '', 'k'),
    end: ['abc', 'def', 'ghi', '|jkl'],
  });

  newTest({
    title: 'Can handle k move',
    start: ['abc', 'def', 'g|hi', 'jkl'],
    keysPressed: easymotionCommand({ key: 'k' }, '', 'k'),
    end: ['abc', '|def', 'ghi', 'jkl'],
  });

  newTest({
    title: 'Can handle bd-jk move (1)',
    start: ['abc', 'def', '|ghi', 'jkl'],
    keysPressed: easymotionCommand({ key: 'bdjk', leaderCount: 3 }, '', 'k'),
    end: ['abc', '|def', 'ghi', 'jkl'],
  });

  newTest({
    title: 'Can handle bd-jk move (2)',
    start: ['abc', 'def', '|ghi', 'jkl'],
    keysPressed: easymotionCommand({ key: 'bdjk', leaderCount: 3 }, '', 'h'),
    end: ['abc', 'def', 'ghi', '|jkl'],
  });

  newTest({
    title: 'Can handle lineforward move (1)',
    start: ['|abcDefGhi'],
    keysPressed: easymotionCommand({ key: 'l', leaderCount: 2 }, '', 'h'),
    end: ['abc|DefGhi'],
  });

  newTest({
    title: 'Can handle lineforward move (2)',
    start: ['|abcDefGhi'],
    keysPressed: easymotionCommand({ key: 'l', leaderCount: 2 }, '', 'k'),
    end: ['abcDef|Ghi'],
  });

  newTest({
    title: 'Can handle linebackward move (1)',
    start: ['abcDefGh|i'],
    keysPressed: easymotionCommand({ key: 'h', leaderCount: 2 }, '', 'k'),
    end: ['abc|DefGhi'],
  });

  newTest({
    title: 'Can handle linebackward move (2)',
    start: ['abcDefGh|i'],
    keysPressed: easymotionCommand({ key: 'h', leaderCount: 2 }, '', 'h'),
    end: ['abcDef|Ghi'],
  });

  newTest({
    title: 'Can handle searching for backslash (\\)',
    start: ['|https:\\\\www.google.com'],
    keysPressed: easymotionCommand({ key: 'f' }, '\\', 'k'),
    end: ['https:\\|\\www.google.com'],
  });

  newTest({
    title: 'Can handle searching for carat (^)',
    start: ['|<^_^>'],
    keysPressed: easymotionCommand({ key: 'f' }, '^', 'h'),
    end: ['<|^_^>'],
  });

  newTest({
    title: 'Can handle searching for dot (.)',
    start: ['|https:\\\\www.google.com'],
    keysPressed: easymotionCommand({ key: 'f' }, '.', 'k'),
    end: ['https:\\\\www.google|.com'],
  });
});
