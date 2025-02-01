const accessKey = "fcYzogcTI2Lz2AEO8NBEDT1L8tgNN8ndo9t5olOoqnA";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = ""; // Clear previous results only on first page load
        }

        const results = data.results;
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Enable or disable show more button based on pagination
        if (results.length === 0 || results.length < 10) {
            showMoreBtn.style.display = "none";
        } else {
            showMoreBtn.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
