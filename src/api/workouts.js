import api from './axios';

// Ключ для localStorage (имитация базы данных)
const WORKOUTS_KEY = 'workouts';
const EXERCISES_KEY = 'exercises';

// Получение всех тренировок текущего пользователя
export const getWorkouts = async () => {
  try {
    // Имитация API - получаем из localStorage
    const user = JSON.parse(localStorage.getItem('workout_user') || '{}');
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    const userWorkouts = workouts.filter(w => w.userId === user.id);
    return userWorkouts;
  } catch (error) {
    console.error('Ошибка загрузки тренировок:', error);
    throw error;
  }
};

// Получение тренировки по ID
export const getWorkoutById = async (id) => {
  try {
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
      workout.exercises = exercises.filter(e => e.workoutId === id);
    }
    return workout;
  } catch (error) {
    console.error('Ошибка загрузки тренировки:', error);
    throw error;
  }
};

// Создание тренировки
export const createWorkout = async (workoutData) => {
  try {
    const user = JSON.parse(localStorage.getItem('workout_user') || '{}');
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    
    const newWorkout = {
      id: Date.now().toString(),
      userId: user.id,
      ...workoutData,
      createdAt: new Date().toISOString(),
      exercises: []
    };
    
    workouts.push(newWorkout);
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    
    return newWorkout;
  } catch (error) {
    console.error('Ошибка создания тренировки:', error);
    throw error;
  }
};

// Обновление тренировки
export const updateWorkout = async (id, workoutData) => {
  try {
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    const index = workouts.findIndex(w => w.id === id);
    
    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...workoutData };
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
      return workouts[index];
    }
    
    throw new Error('Тренировка не найдена');
  } catch (error) {
    console.error('Ошибка обновления тренировки:', error);
    throw error;
  }
};

// Удаление тренировки
export const deleteWorkout = async (id) => {
  try {
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    const filtered = workouts.filter(w => w.id !== id);
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
    
    // Удаляем связанные упражнения
    const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
    const filteredExercises = exercises.filter(e => e.workoutId !== id);
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(filteredExercises));
    
    return true;
  } catch (error) {
    console.error('Ошибка удаления тренировки:', error);
    throw error;
  }
};

// Получение упражнений тренировки
export const getExercises = async (workoutId) => {
  try {
    const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
    return exercises.filter(e => e.workoutId === workoutId);
  } catch (error) {
    console.error('Ошибка загрузки упражнений:', error);
    throw error;
  }
};

// Добавление упражнения
export const addExercise = async (workoutId, exerciseData) => {
  try {
    const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
    
    const newExercise = {
      id: Date.now().toString(),
      workoutId,
      ...exerciseData
    };
    
    exercises.push(newExercise);
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
    
    return newExercise;
  } catch (error) {
    console.error('Ошибка добавления упражнения:', error);
    throw error;
  }
};

// Обновление упражнения
export const updateExercise = async (id, exerciseData) => {
  try {
    const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
    const index = exercises.findIndex(e => e.id === id);
    
    if (index !== -1) {
      exercises[index] = { ...exercises[index], ...exerciseData };
      localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
      return exercises[index];
    }
    
    throw new Error('Упражнение не найдено');
  } catch (error) {
    console.error('Ошибка обновления упражнения:', error);
    throw error;
  }
};

// Удаление упражнения
export const deleteExercise = async (id) => {
  try {
    const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || '[]');
    const filtered = exercises.filter(e => e.id !== id);
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Ошибка удаления упражнения:', error);
    throw error;
  }
};

// Получение тренировок за период
export const getWorkoutsByDateRange = async (startDate, endDate) => {
  try {
    const workouts = await getWorkouts();
    return workouts.filter(w => {
      const workoutDate = new Date(w.date);
      return workoutDate >= new Date(startDate) && workoutDate <= new Date(endDate);
    });
  } catch (error) {
    console.error('Ошибка загрузки тренировок за период:', error);
    throw error;
  }
};

// Получение статистики тренировок
export const getWorkoutStats = async () => {
  try {
    const workouts = await getWorkouts();
    const totalWorkouts = workouts.length;
    const totalExercises = workouts.reduce((sum, w) => sum + (w.exercises?.length || 0), 0);
    
    // Группировка по категориям
    const categoryStats = {};
    workouts.forEach(w => {
      if (!categoryStats[w.category]) {
        categoryStats[w.category] = 0;
      }
      categoryStats[w.category]++;
    });
    
    return {
      totalWorkouts,
      totalExercises,
      categoryStats,
      workouts
    };
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error);
    throw error;
  }
};