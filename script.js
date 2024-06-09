const fetch = require('node-fetch');
const fs = require('fs');

const owner = 'Ademodsx'; // Ganti dengan nama pengguna GitHub Anda
const repo = 'Music'; // Ganti dengan nama repositori GitHub Anda
const filePath = 'music'; // Ganti dengan path file yang ingin diunggah
const token = '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'; // Ganti dengan token personal access GitHub Anda

async function uploadFileAndNotify() {
  const fileContent = fs.readFileSync(filePath);
  const encodedContent = Buffer.from(fileContent).toString('base64');

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Upload file via script',
      content: encodedContent,
      committer: {
        name: 'Ademodsx',
        email: 'ademods0@gmail.com'
      }
    })
  });

  const result = await response.json();
  console.log(result);

  if (result.content && result.content.download_url) {
    const downloadUrl = result.content.download_url;
    const websiteUrl = `https://music.ademods.my.id/music/${encodeURIComponent(filePath)}`;
    console.log('File berhasil diunggah ke GitHub:', downloadUrl);
    console.log('Lanjutkan ke website:', websiteUrl);
    // Lakukan pengiriman ke website di sini
  } else {
    console.error('Gagal mengunggah file ke GitHub.');
  }
}

uploadFileAndNotify();
