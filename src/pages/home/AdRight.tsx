import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function AdRight() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
    };
    return (
        <>
            <div className="pt-8">
                <Slider {...settings}>
                    {Array.from({length: 7}).map((_, i: number) => {
                        const url = `/home/ad/${i+1}.webp`
                        return (
                            <div key={i}>
                                <img src={url} alt="findcare" className="rounded-circle"></img>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    );
}
