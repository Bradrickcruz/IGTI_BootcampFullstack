function leftPad(value, count = 2, char = '0') {
  let newValue = value.toString();

  if (value.toString().length < count) {
    for (let i = 0; i < count - value.toString().length; i++) {
      newValue = char + newValue;
    }
  }
  return newValue;
}

function getTimeStamp() {
  const now = new Date();
  let result;
  // prettier-ignore
  result = `
    ${leftPad(now.getDate())}/${leftPad(now.getMonth()+1)}/${now.getFullYear()} ${leftPad(now.getHours())}:${leftPad(now.getMinutes())}:${leftPad(now.getSeconds())}:${leftPad(now.getMilliseconds(),3)}
  `;

  return result;
}

export { getTimeStamp };
