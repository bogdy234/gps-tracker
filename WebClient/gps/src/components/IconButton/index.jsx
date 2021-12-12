import style from './style.module.css';

const IconButton = ({src, alt, onClick,width, height}) => {
    return <img src={src} alt={alt} onClick={onClick} style={{width:`${width}px`, height:`${height}px`}} className={style.image}/>;
}

export default IconButton;