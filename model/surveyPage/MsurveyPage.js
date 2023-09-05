const MgetRecommendAlcoholList = (calculatedScore) => {
    // todos: db에서 orderby해서 추천 술 가져오기
    const recommendedAlcoholList = {
        mainAlcohol: {
            name: 'mainAlcohol',
        },
        subAlcohol: [{ name: '술1' }, { name: '술2' }, { name: '술3' }],
    };

    return recommendedAlcoholList;
};

export { MgetRecommendAlcoholList };
