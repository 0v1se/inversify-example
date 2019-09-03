// tslint:disable:no-expression-statement
import test from 'ava';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { ComplexComponent, SimpleComponent } from './container';

test('should create container', t => {
  const c = new Container();
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  t.true(c.get(ComplexComponent).getValue() === "testValue");
});

test('should get list of components', t => {
  const c = new Container();
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  const bean = c.get<SimpleComponent>(SimpleComponent);
  t.deepEqual(bean.getSomething(), "some");
  t.deepEqual(bean.getSomething(), "some");
  t.deepEqual(bean.counter, 1);
});

