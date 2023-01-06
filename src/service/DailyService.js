import dailies from '~dailies';

console.log('~dailies', dailies);

export default class DailyService {
  constructor() {
    this.dailies = dailies;
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
