const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    uploadToGitHub(file);
  } else {
    alert('Please select a file');
  }
});

function uploadToGitHub(file) {
  // Ganti dengan kode untuk mengakses token GitHub
  const githubToken = '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';

  const formData = new FormData();
  formData.append('file', file);

  fetch('https://api.github.com/Ademodsx/Music/music', {
    method: 'PUT',
    headers: {
      Authorization: `token ${githubToken}`
    },
    body: JSON.stringify({
      message: 'Upload file',
      content: btoa(unescape(encodeURIComponent(file))),
    })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = 'https://music.ademods.my.id/music/' + file.name;
    } else {
      throw new Error('Error uploading file to GitHub');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while uploading the file');
  });
}
