/* tslint:disable:max-classes-per-file no-console */
// tslint:disable:no-expression-statement
import test from 'ava';
import 'reflect-metadata';
import { instance, mock, when } from 'ts-mockito';

class SomeService {
  public getValue1(): string {
    return "value1";
  }

  public getValue2 = (): string => "value2";
}

class SomeServiceUser {
  public constructor(private readonly service: SomeService) {

  }

  public getValue1(): string {
    return this.service.getValue1();
  }

  public getValue2(): string {
    return this.service.getValue2();
  }
}

test('should mock class functions', t => {
  const mocked = mock(SomeService);
  when(mocked.getValue1()).thenReturn("value1-changed");
  const service = instance(mocked);
  const user = new SomeServiceUser(service);

  t.deepEqual(user.getValue1(), "value1-changed");
});

test('should mock arrow functions in class', t => {
  const mocked = mock(SomeService);
  when(mocked.getValue2()).thenReturn("value2-changed");
  const service = instance(mocked);
  const user = new SomeServiceUser(service);

  t.deepEqual(user.getValue2(), "value2-changed");
});


