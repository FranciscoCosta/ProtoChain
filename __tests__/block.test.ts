import Block from '../src/lib/block';
import { describe, test, expect } from '@jest/globals';

describe('Block tests', () => {

    test('Block creation', () => {
        const b = new Block(1, "data123");
        expect(b.index).toBe(1);
        expect(b.data).toBe('data123');
        expect(b.previousHash).toBe('');
    });

    test('Block creation with previousHash', () => {
        const b = new Block(1, "data123", "previousHash");
        expect(b.index).toBe(1);
        expect(b.data).toBe('data123');
        expect(b.previousHash).toBe('previousHash');
    });

    test('Block isValid with invalid index', () => {
        const b = new Block(-1, "data123");
        expect(b.isValid()).toBe(false);
    });

    test('Block isValid with invalid timestamp', () => {
        const b = new Block(1, "data123");
        b.timestamp = -1;
        expect(b.isValid()).toBe(false);
    });

    test('Block isValid with invalid data', () => {
        const b = new Block(1, "data123");
        b.data = '';
        expect(b.isValid()).toBe(false);
    });

    test('Block isValid with invalid hash', () => {
        const b = new Block(1, "data123");
        b.hash = 'invalid hash';
        expect(b.isValid()).toBe(false);
    });



    test('Block isValid with invalid previousHash', () => {
        const b = new Block(1, "data123");
        const c = new Block(2, "data123", "invalid hash");
        c.previousHash = '';
        expect(c.isValid()).toBe(false);
    
    });

    test('Block isValid with valid block', () => {
        const b = new Block(1, "data123");
        const c = new Block(2, "data123", b.hash);
        expect(c.isValid()).toBe(true);
    });

    test('Block isValid previousHash', () => {
        const b = new Block(1, "data123");
        const c = new Block(2, "data123", "");
        expect(c.isValid()).toBe(false);
    });





});