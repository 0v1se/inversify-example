// tslint:disable:no-expression-statement
import test from 'ava';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { ComplexComponent } from './container';
import "./container-promise"
import { initialize } from './init';

test('should create container', t => {
  const c = new Container();
  c.load(buildProviderModule());
  c.bind("value").toConstantValue("testValue");
  t.true(c.get(ComplexComponent).getValue() === "testValue");
});

test('should create container with promises', async t => {
  const c = await initialize(new Container());
  c.load(buildProviderModule());
  t.true(c.get<string>("result") === "resultValue");
});


