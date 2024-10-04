// Display file size in MB when an image is uploaded
document.getElementById('imageInput').addEventListener('change', function() {
    const imageInput = document.getElementById('imageInput').files[0];
    if (imageInput) {
        const fileSizeMB = (imageInput.size / (1024 * 1024)).toFixed(2); // Convert size to MB
        document.getElementById('fileSize').textContent = `File Size: ${fileSizeMB} MB`;
    } else {
        document.getElementById('fileSize').textContent = '';
    }
});

document.getElementById('compressButton').addEventListener('click', function(){
    const imageInput = document.getElementById('imageInput').files[0];
    const quality = document.getElementById('quality').value / 100; // Convert range between 0 to 1
    const width = parseInt(document.getElementById('width').value); // Get specified width
    const height = parseInt(document.getElementById('height').value); // Get specified height

    if(imageInput){
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas size to user specified dimensions
                canvas.width = width;
                canvas.height = height;
                
                // Draw the image with resizing
                ctx.drawImage(img, 0, 0, width, height); // Resize image to fit canvas

                // Compress and create a Blob
                canvas.toBlob(function (blob) {
                    const downloadLink = document.getElementById('downloadLink');
                    const outputImage = document.getElementById('outputImage');
                    const url = URL.createObjectURL(blob);

                    downloadLink.href = url;
                    downloadLink.style.display = 'inline';
                    downloadLink.textContent = 'Download Compressed Image';

                    outputImage.src = url;
                    outputImage.style.display = 'inline';
                }, 'image/jpeg', quality); // Adjust image quality
            };
            img.src = event.target.result; // Set image source to result
        };
        reader.readAsDataURL(imageInput); // Start reading the file
    } else {
        alert('Please upload an image.');
    }
});