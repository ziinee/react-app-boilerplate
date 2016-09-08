// @flow

export type TaskType = {
  id: number,
  name: string,
  done: boolean,
}

export type CardType = {
  id: number,
  title: string,
  description: string,
  color: string,
  status: string,
  tasks: TaskType[],
}

export type TaskCallbackType = {
  toggle: Object,
  delete: Object,
  add: Object,
}
