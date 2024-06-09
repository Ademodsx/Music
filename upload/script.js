const token = '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';
const repoOwner = 'Ademodsx';
const repoName = 'Music';
const uploadURL = `https://api.github.com/repos/${repoOwner}/${repoName}/music/`;

document.getElementById('uploadBtn').addEventListener('click', uploadFile);

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const fileContent = reader.result.split(',')[1];
        const fileName = file.name;

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Upload file',
                content: fileContent
            })
        };

        fetch(uploadURL + fileName, requestOptions)
            .then(response => response.json())
            .then(data => {
                const fileURL = data.content.download_url;
                window.location.href = `https://music.ademods.my.id/music/${fileName}`;
            })
            .catch(error => console.error('Error:', error));
    };
}
