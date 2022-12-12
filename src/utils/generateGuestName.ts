const generateGuestName = (): string => {
  const randomNum: number = Math.floor(Math.random() * 1000);
  return `Guest#${randomNum}`;
};

export default generateGuestName;
