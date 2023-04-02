import * as apiService from './api-service';
import * as pagination from './pagination';

// Виводимо ТОП фільмів з пагінацією
renderTOPMovies();

// Функція виводу ТОП фільмів з пагінацією
async function renderTOPMovies() {
    // ТОП фільмів - вивести 1 сторінка
    const totalResults = await apiService.getTOPMovies(1);
    
    if (totalResults) {
        // ТОП фільмів - активувати пагінацію
        pagination.initPagination(totalResults, apiService.getTOPMovies);
    }
}