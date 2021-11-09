import supertest from 'supertest';
import {app} from '../../app';
import { pool } from '../../repositories/taskListRepository';

const server = supertest(app);

describe('taskLists', () => {
  let taskId;
  afterAll(async () => {
    await pool.end();
  });
  it('creates new taskList', () =>
    server
      .post('/task-lists')
      .send({ title: 'task-list' })
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: 1,
          title: 'task-list',
          updated_at: expect.anything()
        })
      ));
  it('GETs all task-lists', () =>
    server.get('/task-lists').expect(({ body }) =>
      expect(body).toMatchObject([
        {
          id: 1,
          title: 'task-list',
          updated_at: expect.anything()
        }
      ])
    ));
  it('attach task to task-list', async () => {
    ({
      body: { id: taskId }
    } = await server.post('/tasks').send({ title: 'test task' }));
    return server
      .post('/task-lists/1/task-attach')
      .send({ taskId })
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: 1,
          title: 'task-list',
          tasks: [
            {
              id: 1,
              title: 'test task',
              description: '',
            }
          ],
          updated_at: expect.anything()
        })
      );
  });
  it('GETs a task-list and its tasks', () =>
    server.get('/task-lists/1').expect(({ body }) =>
      expect(body).toMatchObject({
        id: 1,
        title: 'task-list',
        tasks: [
          {
            id: 1,
            title: 'test task',
            description: '',
          }
        ],
        updated_at: expect.anything()
      })
    ));
  it('removes task from task-list', () =>
    server.delete('/task-lists/1/task-attach/1').expect(({ body }) =>
      expect(body).toMatchObject({
        id: 1,
        title: 'task-list',
        updated_at: expect.anything(),
        tasks: []
      })
    ));
});
