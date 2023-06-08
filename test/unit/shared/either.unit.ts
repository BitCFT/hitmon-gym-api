import { Left, Right, left, right } from '@shared/either';

describe('shared.either', () => {
  describe('Left', () => {
    it('should create a new instance of Left', () => {
      const result = new Left('Error');
      expect(result.value).toBe('Error');
    });

    it('should return true for isLeft() method', () => {
      const result = new Left('Error');
      expect(result.isLeft()).toBe(true);
    });

    it('should return false for isRight() method', () => {
      const result = new Left('Error');
      expect(result.isRight()).toBe(false);
    });
  });

  describe('Right', () => {
    it('should create a new instance of Right', () => {
      const result = new Right(42);
      expect(result.value).toBe(42);
    });

    it('should return false for isLeft() method', () => {
      const result = new Right(42);
      expect(result.isLeft()).toBe(false);
    });

    it('should return true for isRight() method', () => {
      const result = new Right(42);
      expect(result.isRight()).toBe(true);
    });
  });

  describe('left()', () => {
    it('should create a new instance of Left', () => {
      const result = left('Error');
      expect(result.value).toBe('Error');
      expect(result.isLeft()).toBe(true);
    });
  });

  describe('right()', () => {
    it('should create a new instance of Right', () => {
      const result = right(42);
      expect(result.value).toBe(42);
      expect(result.isRight()).toBe(true);
    });
  });
});
