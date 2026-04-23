// Список упражнений с ID для бэкенда
export const exercisesList = [
  { id: 1, name: "Жим лёжа", targetMuscle: "Грудь" },
  { id: 2, name: "Приседания", targetMuscle: "Ноги" },
  { id: 3, name: "Становая тяга", targetMuscle: "Спина" },
  { id: 4, name: "Отжимания", targetMuscle: "Грудь" },
  { id: 5, name: "Подтягивания", targetMuscle: "Спина" },
  { id: 6, name: "Бег", targetMuscle: "Кардио" },
  { id: 7, name: "Планка", targetMuscle: "Пресс" },
  { id: 8, name: "Выпады", targetMuscle: "Ноги" },
  { id: 9, name: "Жим гантелей сидя", targetMuscle: "Плечи" },
  { id: 10, name: "Скручивания", targetMuscle: "Пресс" },
  { id: 11, name: "Бурпи", targetMuscle: "Кардио" },
  { id: 12, name: "Запрыгивания", targetMuscle: "Ноги" },
  { id: 13, name: "Французский жим", targetMuscle: "Трицепс" },
  { id: 14, name: "Подъём гантелей на бицепс", targetMuscle: "Бицепс" },
  { id: 15, name: "Разведение гантелей", targetMuscle: "Плечи" },
  { id: 16, name: "Гиперэкстензия", targetMuscle: "Спина" },
  { id: 17, name: "Велосипед", targetMuscle: "Пресс" },
  { id: 18, name: "Боковая планка", targetMuscle: "Кор" },
  { id: 19, name: "Забегания на степ", targetMuscle: "Кардио" },
  { id: 20, name: "Прыжки на скакалке", targetMuscle: "Кардио" }
];

// Получить упражнение по ID
export const getExerciseById = (id) => {
  return exercisesList.find(ex => ex.id === id);
};

// Получить все упражнения
export const getAllExercises = () => {
  return exercisesList;
};