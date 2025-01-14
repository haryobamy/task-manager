import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  tasks: Task[];
  task: any;
  isEditing: boolean;
  priority: string;
  activeTask: null;
  modalMode: string;
  profileModal: boolean;
  openTaskModal: boolean;
}

const initialState: initialStateTypes = {
  tasks: [],
  task: {},
  isEditing: false,
  openTaskModal: false,
  priority: "all",
  activeTask: null,
  modalMode: "",
  profileModal: false,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    toggleTaskModal(
      state,
      { payload }: PayloadAction<{ open: boolean; type: string }>,
    ) {
      state.openTaskModal = payload.open;
      state.modalMode = payload.type;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setModalMode(state, action) {
      state.modalMode = action.payload;
    },
    setActiveTask(state, action) {
      state.activeTask = action.payload;
    },
    setTasks(state, { payload }: PayloadAction<Task[]>) {
      state.tasks = payload;
    },
    setTask(state, { payload }: PayloadAction<Task[]>) {
      state.task = payload;
    },
  },
});

export const {
  setIsEditing,
  setPriority,
  setModalMode,
  setActiveTask,
  setTasks,
  toggleTaskModal,
  setTask,
} = taskSlice.actions;
export default taskSlice.reducer;
