export const getCardColor = (opacityStart: number = 0.08, opacityEnd: number = 0.08) => {
  //https://webkul.github.io/coolhue/
  const CardColors = [
    `linear-gradient(121deg,rgba(196,255,255,${opacityStart}) 0%,rgba(190,83,69,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(239,184,174,${opacityStart}) 0%,rgba(127,156,76,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(252,175,162,${opacityStart}) 0%,rgba(127,156,76,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(202,167,247,${opacityStart}) 0%,rgba(196,255,255,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(202,167,247,${opacityStart}) 0%,rgba(127,156,76,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(202,167,247,${opacityStart}) 0%,rgba(252,175,162,${opacityEnd}) 100%)`,
    `linear-gradient(121deg,rgba(202,167,247,${opacityStart}) 0%,rgba(146,230,245,${opacityEnd}) 100%)`,
    `linear-gradient(135deg,rgba(67,203,255,${opacityStart}) 10%,rgba(151,8,204,${opacityEnd}) 100%)`,
    `linear-gradient(135deg,rgba(194, 255, 216, ${opacityStart}) 10%,rgba(70, 94, 251, ${opacityEnd}) 100%)`,
  ]
  const randomIndex = Math.floor(Math.random() * CardColors.length)
  return CardColors[randomIndex]
}