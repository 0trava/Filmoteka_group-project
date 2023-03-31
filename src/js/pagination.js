import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

export function initPagination(totalItems, funcOutputData) {
    const options = {
        totalItems, // Загальна кількість елементів
        itemsPerPage: 20, // Кількість елементів на одній сторінці
        visiblePages: 5, // Кількість видимих сторінок
        page: 1, // З якої сторінки починається вивід
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
            disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
            moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'
        }
        };

        const pagination = new Pagination('pagination', options);
    
        pagination.on('beforeMove', evt => {
            const { page } = evt;
            window.scrollTo(0, 0); 
            funcOutputData(page);
        });
}

