import api from './axios';

// Получить все тренировки пользователя
export const getAllTrainings = async () => {
  try {
    // Получаем текущий месяц
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
    const to = new Date(now.getFullYear(), now.getMonth() + 2, 0).getTime();
    
    const response = await api.get(`/trainings/range?from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return []; // Нет тренировок
    }
    console.error('Ошибка загрузки тренировок:', error);
    throw error;
  }
};

// Получить тренировки за диапазон дат
export const getTrainingsByRange = async (from, to) => {
  try {
    const response = await api.get(`/trainings/range?from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// Получить тренировки за конкретный день
export const getTrainingsByDay = async (date) => {
  try {
    const response = await api.get(`/trainings/day?date=${date}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// Получить тренировку по timestamp
export const getTrainingByTimestamp = async (timestamp) => {
  try {
    const response = await api.get(`/trainings/timestamp/${timestamp}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки тренировки:', error);
    throw error;
  }
};

// Создать тренировку
export const createTraining = async (timestamp, category, exercises) => {
  try {
    const response = await api.post('/trainings', {
      timestamp,
      category,
      exercises: exercises.map((ex, index) => ({
        exerciseId: ex.exerciseId,
        sortId: ex.sortId || index + 1
      }))
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка создания тренировки:', error);
    throw error;
  }
};

// Добавить упражнение в тренировку
export const addExerciseToTraining = async (trainingId, exerciseId, sortId) => {
  try {
    const response = await api.post('/trainings/exercises/add', {
      trainingId,
      exerciseId,
      sortId
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка добавления упражнения:', error);
    throw error;
  }
};

// Удалить упражнение из тренировки
export const removeExerciseFromTraining = async (trainingId, exerciseId) => {
  try {
    const response = await api.delete('/trainings/exercises/remove', {
      data: { trainingId, exerciseId }
    });
    return response;
  } catch (error) {
    console.error('Ошибка удаления упражнения:', error);
    throw error;
  }
};

// Список доступных упражнений (локальный, так как API их не предоставляет)
export const getAvailableExercises = () => {
  return [
    { id: 1, name: 'Жим лёжа', targetMuscle: 'Грудь' },
    { id: 2, name: 'Приседания', targetMuscle: 'Ноги' },
    { id: 3, name: 'Становая тяга', targetMuscle: 'Спина' },
    { id: 4, name: 'Отжимания', targetMuscle: 'Грудь, Трицепс' },
    { id: 5, name: 'Подтягивания', targetMuscle: 'Спина, Бицепс' },
    { id: 6, name: 'Бег', targetMuscle: 'Кардио' },
    { id: 7, name: 'Планка', targetMuscle: 'Кор' },
    { id: 8, name: 'Выпады', targetMuscle: 'Ноги' },
    { id: 9, name: 'Жим гантелей', targetMuscle: 'Плечи' },
    { id: 10, name: 'Скручивания', targetMuscle: 'Пресс' },
    { id: 11, name: 'Бурпи', targetMuscle: 'Кардио' },
    { id: 12, name: 'Запрыгивания', targetMuscle: 'Ноги, Кардио' }
  ];
};