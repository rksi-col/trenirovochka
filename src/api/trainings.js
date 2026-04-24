import api from './axios';
import { exercisesList } from './exercisesList';

// Получить список упражнений (локально)
export const getAvailableExercises = () => {
  return exercisesList;
};

// Получить все тренировки пользователя
export const getAllTrainings = async () => {
  try {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
    const to = new Date(now.getFullYear(), now.getMonth() + 2, 0).getTime();
    
    const response = await api.get(`/trainings/range?from=${from}&to=${to}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
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

// Создать тренировку (АВТОМАТИЧЕСКИ ПОДСТАВЛЯЕТ ID УПРАЖНЕНИЙ)
export const createTraining = async (timestamp, category, exercises) => {
  try {
    // Формируем запрос с ID упражнений
    const requestBody = {
      timestamp: timestamp,
      category: category,
      exercises: exercises.map((ex, index) => ({
        exercise_id: ex.exerciseId,  // ← здесь подставляется ID
        sort_id: ex.sortId || index + 1
      }))
    };
    
    console.log('📤 Отправляем на сервер:', JSON.stringify(requestBody, null, 2));
    
    const response = await api.post('/trainings', requestBody);
    console.log('✅ Ответ сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка создания тренировки:', error.response?.data || error.message);
    throw error;
  }
};

// Добавить упражнение в тренировку (АВТОМАТИЧЕСКИ ПОДСТАВЛЯЕТ ID)
export const addExerciseToTraining = async (trainingId, exerciseId, sortId) => {
  try {
    const requestBody = {
      training_id: trainingId,
      exercise_id: exerciseId,  // ← здесь подставляется ID
      sort_id: sortId
    };
    
    console.log('📤 Добавляем упражнение:', JSON.stringify(requestBody, null, 2));
    
    const response = await api.post('/trainings/exercises/add', requestBody);
    console.log('✅ Упражнение добавлено:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка добавления упражнения:', error.response?.data || error.message);
    throw error;
  }
};

// Удалить упражнение из тренировки
export const removeExerciseFromTraining = async (trainingId, exerciseId) => {
  try {
    const response = await api.delete('/trainings/exercises/remove', {
      data: { training_id: trainingId, exercise_id: exerciseId }
    });
    console.log('✅ Упражнение удалено');
    return response;
  } catch (error) {
    console.error('❌ Ошибка удаления упражнения:', error.response?.data || error.message);
    throw error;
  }
};