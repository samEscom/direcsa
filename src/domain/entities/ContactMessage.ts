export class ContactMessage {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly description: string,
        public readonly createdAt: Date,
        public readonly phone?: string,
    ) { }
}
