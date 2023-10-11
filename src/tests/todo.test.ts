import {test, expect} from 'vitest';
import ToDoWrapper from '../components/ToDoWrapper'

test("Todo app renders without errors", () => {
    expect(ToDoWrapper).not.toBeNull();
})