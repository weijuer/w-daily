import { generateDaily } from 'Utils/dailyUtils';

export default class DailyService {
  constructor() {
    this.dailies = generateDaily();
  }

  findAll() {
    return Promise.resolve(this.dailies);
  }

  findOne(id) {
    let foundDaily = undefined;
    this.dailies.forEach((daily) => {
      if (daily.id === id) foundDaily = daily;
    });

    return foundDaily;
  }

  save(daily) {
    this.dailies.push(daily);
    return daily;
  }

  remove(id) {
    const daily = this.findOne(id);
    if (daily) this.dailies.splice(this.dailies.indexOf(daily), 1);

    return daily;
  }
}
