import * as dotenv from 'dotenv'
import * as fs from 'fs'

export class ConfigService {
    private envConfig: { [key: string]: string }

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath))

        console.log(JSON.stringify(this.envConfig))
        this.envConfig = Object.keys(this.envConfig).reduce((config, key) => {
            const overrideValue = process.env[key]
            if (overrideValue !== undefined) {
                config[key] = overrideValue
            } else {
                config[key] = this.envConfig[key]
            }
            return config
        }, {})
        console.log(JSON.stringify(this.envConfig))
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}
