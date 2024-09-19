import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('-');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1');
  });
  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('x');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');

    service.constructNumber('C');
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });
  it('should calculate result correctly for division', () => {
    service.constructNumber('2');
    service.constructNumber('5');
    service.constructNumber('/');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');

    service.constructNumber('C');
    service.constructNumber('2');
    service.constructNumber('5');
    service.constructNumber('÷');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle Backspace correctly', () => {
    // service.constructNumber('1');
    // service.constructNumber('0');
    // service.constructNumber('0');
    // or
    service.resultText.set('100');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('10');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    //! MAX_LENGTH = 10
    // service.resultText.set('1111111111');
    // service.constructNumber('1');

    // expect(service.resultText()).toBe('1111111111');

    // or
    for (let i = 0; i < 10; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);
    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });

  it('should handle Backspace correctly when resultText is a negative number', () => {
    service.resultText.set('-10');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('-1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle negative number correctly when init with "-0"', () => {
    service.resultText.set('-0');
    service.constructNumber('1');
    expect(service.resultText()).toBe('-1');
  });
});