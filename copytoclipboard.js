document.getElementById('copyToClipboard').addEventListener('click', () => {
    const outputTextarea = document.getElementById('output');
    outputTextarea.select();
    document.execCommand('copy');
  });
  