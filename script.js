document.getElementById('compressButton').addEventListener('click', function(){
    const imageInput = document.getElementById('imageInput').files[0];
    const quality = document.getElementById('quality').value / 100; // convert range between 0 to 1

    if(imageInput){
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

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
