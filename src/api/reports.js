import api from './axios';

export const exportPdf = async (from, to) => {
    const response = await api.get(`/reports/pdf?from=${from}&to=${to}`, {
        responseType: 'blob'
    });

    // Скачиваем файл
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `trainings-report-${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const exportXlsx = async (from, to) => {
    const response = await api.get(`/reports/xlsx?from=${from}&to=${to}`, {
        responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `trainings-report-${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};