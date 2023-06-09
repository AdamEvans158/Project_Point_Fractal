// Returns canvas as new Image object. 
export default function convertFractalToImage(canvas){
    const fractImage = new Image();
    fractImage.src = canvas.toDataURL(); 

    return fractImage;
}