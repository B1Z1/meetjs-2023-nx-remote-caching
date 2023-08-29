import { TaskStatus } from 'nx/src/tasks-runner/tasks-runner';

export type DefaultTaskRunnerOutput = Promise<any | { [id: string]: TaskStatus }>;