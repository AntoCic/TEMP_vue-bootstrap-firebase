export default {
    form: '',
    VL: {},

    init(form = '') {
        this.VL = {}
        this.form = form
    },

    check(request) {
        let { type, query, required, form, ...varTocheck } = request;
        if (!form) {
            form = ''
        }

        if (Object.keys(varTocheck).length === 1) {
            const [varName, value] = Object.entries(varTocheck)[0];
            if (type) {
                request.type = request.type.replace(/\s/g, '');

                if (!Object.hasOwn(this.VL, form)) {
                    this.VL[form] = {}
                }

                if (!Object.hasOwn(this.VL[form], varName)) {
                    this.VL[form][varName] = null
                }

                switch (type) {
                    case 'string':
                        this.VL_string(form, value, varName, query)
                        break;

                    case 'email':
                        this.VL_email(form, value, varName)
                        break;

                    case 'integer':
                        this.VL_integer(form, value, varName, query)
                        break;

                    case 'decimal':
                        this.VL_decimal(form, value, varName, query)
                        break;

                    case 'boolean':
                        this.VL_boolean(form, value, varName);
                        break;

                    case 'password':
                        this.VL_password(form, value, varName, query);
                        break;

                    case 'retype-password':
                        this.VL_retypePassword(form, value, varName, query);
                        break;

                    case 'date':
                        this.VL_date(form, value, varName)
                        break;

                    case 'end-date':
                        this.VL_endDate(form, value, varName, query)
                        break;

                    case 'time':
                        this.VL_time(form, value, varName)
                        break;
                    default:
                        console.error('Tipo di validazione non corretta. Controllare README.md')
                        return '';
                }

                if (this.VL[form][varName] === true) {
                    return 'is-valid';
                } else if (this.VL[form][varName] === false) {
                    return 'is-invalid';
                } else {
                    return '';
                }

            } else {
                console.error("Object.type ASSENTE")
                return '';
            }
        } else {
            console.error("Object.varTocheck ASSENTE o hai aggiunto Object.key non richesti")
            return '';
        }
    },

    isAllValidated() {
        let isValid = true
        for (const varName in this.VL[this.form]) {
            if (!this.VL[this.form][varName]) {
                this.VL[this.form][varName] = false
                isValid = this.VL[this.form][varName];
            }
        }
        return isValid
    },

    showError(varName) {
        if (this.VL[this.form]) {
            if (this.VL[this.form][varName] === false) {
                return 'text-danger ps-2 mb-0 small '
            }
        }

        return 'd-none'
    },

    VL_string(form, value, varName, query) {
        let min = 3;
        let max = 255;

        if (query) {
            query = query.map(Number);
            min = query[0] || min;
            max = query[1] || max;
        }
        value
        if (
            value.length <= max &&
            value.length >= min
        ) {
            this.VL[form][varName] = true
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },

    VL_email(form, value, varName) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (emailRegex.test(value)) {
            this.VL[form][varName] = true
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },
    VL_integer(form, value, varName, query) {
        let min = 1;
        let max = 255;

        if (query) {
            query = query.map(Number);
            min = query[0] || min;
            max = query[1] || max;
        }

        if (
            value <= max &&
            value >= min &&
            value % 1 == 0
        ) {
            this.VL[form][varName] = true
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },
    VL_decimal(form, value, varName, query) {
        let min = 1;
        let max = 9999.99;

        if (query) {
            query = query.map(Number);
            min = query[0] || min;
            max = query[1] || max;
        }

        if (
            value <= max &&
            value >= min
        ) {
            this.VL[form][varName] = true
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },
    VL_boolean(form, value, varName) {
        if (
            value == "0" ||
            value == "1" ||
            value == 0 ||
            value == 1
        ) {
            this.VL[form][varName] = true
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },

    VL_password(form, value, varName, query) {
        let min = 8;
        let max = 255;

        if (query) {
            query = query.map(Number);
            min = query[0] || min;
            max = query[1] || max;
        }

        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/;

        if (
            value.length <= max &&
            value.length >= min
        ) {
            if (regexPassword.test(value)) {
                this.VL[form][varName] = true
            } else {
                this.VL[form][varName] = false;
            }
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },

    VL_retypePassword(form, value, varName, query) {
        if (value.length >= 8) {
            if (value === query) {
                this.VL[form][varName] = true
            } else {
                this.VL[form][varName] = false;
            }
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }

    },

    VL_date(form, value, varName) {
        const regexData = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (value.length) {
            if (regexData.test(value)) {
                this.VL[form][varName] = true
            } else {
                this.VL[form][varName] = false;
            }
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },

    VL_endDate(form, value, varName, query) {
        const regexData = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (value.length) {
            if (regexData.test(value) &&
                regexData.test(query) &&
                new Date(query) <= new Date(value)
            ) {
                this.VL[form][varName] = true;
            } else {
                this.VL[form][varName] = false;
            }
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },

    VL_time(form, value, varName) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (value.length) {
            if (timeRegex.test(value)) {
                this.VL[form][varName] = true
            } else {
                this.VL[form][varName] = false;
            }
        } else {
            if (this.VL[form][varName] !== null) {
                this.VL[form][varName] = false;
            }
        }
    },
}