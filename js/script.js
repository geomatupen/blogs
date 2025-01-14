const blogs = [
    { title: 'Blog Post Title 1', date: '2025-01-14', category: 'category1', description: 'A brief description of what this blog post is about...', link: 'blog1.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 2', date: '2025-01-13', category: 'category2', description: 'A brief description of what this blog post is about...', link: 'blog2.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 3', date: '2025-01-12', category: 'category1', description: 'A brief description of what this blog post is about...', link: 'blog3.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 4', date: '2025-01-11', category: 'category2', description: 'A brief description of what this blog post is about...', link: 'blog4.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 5', date: '2025-01-10', category: 'category1', description: 'A brief description of what this blog post is about...', link: 'blog5.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 6', date: '2025-01-09', category: 'category2', description: 'A brief description of what this blog post is about...', link: 'blog6.html', image: 'images/3dbuildings.png' },
    { title: 'Blog Post Title 7', date: '2025-01-08', category: 'category1', description: 'A brief description of what this blog post is about...', link: 'blog7.html', image: 'images/3dbuildings.png' },
    // { title: 'Blog Post Title 8', date: '2025-01-07', category: 'category2', description: 'A brief description of what this blog post is about...', link: 'blog8.html', image: 'images/3dbuildings.png' },
];

let currentPage = 1;
const postsPerPage = 6;

function renderPosts(filteredBlogs) {
    const totalPosts = filteredBlogs.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    currentPage = Math.min(currentPage, totalPages);

    // Reset currentPage to 1 if filteredBlogs length is 0 or not enough to display currentPage
    if (filteredBlogs.length === 0 || filteredBlogs.length <= (currentPage - 1) * postsPerPage) {
        currentPage = 1;
    }

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const paginatedBlogs = filteredBlogs.slice(start, end);

    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';
    paginatedBlogs.forEach(blog => {
        const blogCard = document.createElement('a');
        blogCard.href = blog.link;
        blogCard.className = 'bg-white p-6 border border-gray-300 rounded-lg shadow hover:bg-gray-50';
        blogCard.innerHTML = `
            <img src="${blog.image}" alt="Blog Image" class="w-full h-40 object-cover rounded-lg mb-4">
            <h4 class="text-l font-bold">${blog.title}</h4>
            <p class="text-gray-500 text-sm">Date: ${blog.date}</p>
            <p class="mt-2 text-gray-500">${blog.description}</p>
        `;
        blogList.appendChild(blogCard);
    });

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    // Hide or show the Previous and Next buttons based on the number of filtered blogs
    if (filteredBlogs.length <= postsPerPage) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function filterBlogs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    let filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchInput) &&
        (categoryFilter === '' || blog.category === categoryFilter)
    );

    if (sortFilter === 'date-asc') {
        filteredBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortFilter === 'date-dsc') {
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortFilter === 'name') {
        filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filteredBlogs;
}

document.getElementById('searchInput').addEventListener('input', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput === '') {
        renderPosts(blogs);
    } else {
        const filteredBlogs = filterBlogs();
        renderPosts(filteredBlogs);
    }
});

document.getElementById('categoryFilter').addEventListener('change', () => {
    const filteredBlogs = filterBlogs();
    renderPosts(filteredBlogs);
});

document.getElementById('sortFilter').addEventListener('change', () => {
    const filteredBlogs = filterBlogs();
    renderPosts(filteredBlogs);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const filteredBlogs = filterBlogs();
        renderPosts(filteredBlogs);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    const filteredBlogs = filterBlogs();
    renderPosts(filteredBlogs);
});

// Initial render of all posts
renderPosts(blogs);
