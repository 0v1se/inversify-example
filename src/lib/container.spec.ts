// tslint:disable:no-expression-statement
import test from 'ava';
import { AsyncContainerModule, Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { ComplexComponent, Handler, SimpleComponent } from './container';

test('should create container', t => {
  const c = new Container();
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  t.true(c.get(ComplexComponent).getValue() === "testValue");
});

test('should use cache', t => {
  const c = new Container();
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  const bean = c.get<SimpleComponent>(SimpleComponent);
  t.deepEqual(bean.getSomething(), "some");
  t.deepEqual(bean.getSomething(), "some");
  t.deepEqual(bean.counter, 1);
});

test('should get list of tagged', t => {
  const c = new Container();
  c.load(buildProviderModule());
  const list = c.getAll<Handler>("handler");
  t.deepEqual(list.length, 2);
});

test('should use singletons', t => {
  const c = new Container();
  c.options.defaultScope = 'Singleton';
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  const bean = c.get<SimpleComponent>(SimpleComponent);
  const bean2 = c.get<SimpleComponent>(SimpleComponent);
  t.true(bean === bean2);
});

test('should use modules', async t => {
  const c = new Container();
  c.options.defaultScope = 'Singleton';
  c.load(buildProviderModule());

  const module = new AsyncContainerModule(async (bind) => {
    const value = await Promise.resolve("testValue");
    bind("value").toConstantValue(value);
  });

  await c.loadAsync(module);

  const bean = c.get(SimpleComponent);
  const bean2 = c.get(SimpleComponent);
  t.true(bean === bean2);
  const cc = c.get(ComplexComponent);
  t.true(cc != null);
});


