const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailservice = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dtos')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password) {
        const isUnique = await UserModel.findOne({email})
        if(isUnique){
            throw ApiError.BadRequest('User already exist')
        }
        const hashPass = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email: email, password: hashPass, activationLink: activationLink})
        await mailservice.sendActivationMail(email, `${process.env.API_URL}/api/activation/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto }
    }

    async activation(activationLink){
        const user = await UserModel.findOne({activationLink})
        console.log(user)
        if(!user) {
            throw ApiError.BadRequest('Shiit мэнчик, cringe')
        }
        user.activated = true
        await user.save()
    }
}

module.exports = new UserService()