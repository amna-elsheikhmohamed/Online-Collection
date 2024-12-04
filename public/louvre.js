async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

async function ArtObject() {
    const apiUrls = ["http://localhost:3000/api/louvre", "http://localhost:3000/api/louvre2","http://localhost:3000/api/louvre3"];
    const container = document.getElementById('artImageContainer');

    for (const url of apiUrls) {
        const data = await fetchData(url);
        if (!data || !data.image || data.image.length === 0) {
            console.error(`No image data received from ${url}`);
            continue;
        }

        data.image.forEach(imageObj => {
            const img = document.createElement('img');
            img.src = imageObj.urlImage;
            img.alt = imageObj.title || 'Art Object Image'; // Add alt text dynamically
            container.appendChild(img);
        });
    }
}

document.addEventListener("DOMContentLoaded", ArtObject);
