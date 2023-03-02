class User {
    constructor({
        username,
        email,
        password
    } = {}) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async save() {
        // Lưu trữ thông tin người dùng vào cơ sở dữ liệu
    }

    toObject(options) {
        // Trả về một đối tượng chứa thông tin người dùng
        // Có thể loại bỏ thuộc tính không mong muốn như password hoặc versionKey
    }

    static async findOne(query) {
        // Tìm kiếm một người dùng trong cơ sở dữ liệu theo điều kiện query
        // Trả về một instance của class User nếu tìm thấy hoặc null nếu không tìm thấy
    }

    static async findById(id) {
        // Tìm kiếm một người dùng trong cơ sở dữ liệu theo id
        // Trả về một instance của class User nếu tìm thấy hoặc null nếu không tìm thấy
    }
}

// Định nghĩa một schema cho User
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Tạo một model từ schema và xuất nó ra khỏi file
const User = mongoose.model('User', userSchema);
module.exports.User = User;