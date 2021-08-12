
const state = {
    snackbarData: {
        text: '',
        timeOut: 4000,
        autoHeight: false,
        color: '#82FF95',
        hasCloseBtn: true,
        closeBtnText: 'Cerrar',
        closeBtnColor: '#9c28b2',
        active: false,
        top: false,
        bottom: true,
        right: true

    }
};

const getters = {
    getSnackbarData: state => {
        return state.snackbarData;
    }
};

const actions = {
    triggerSnackbar(context, payload) {
        context.commit("triggerSnackbar", payload);
    },
    closeSnackbar(context, payload) {
        context.commit("closeSnackbar");
    }
};
const mutations = {
    closeSnackbar(state, data) {
        state.snackbarData.active = false;
    },
    triggerSnackbar(state, data) {
        if (state.snackbarData.active) {
            state.snackbarData.active = false;
        }
        setTimeout(() => {
            if (data.text) {
                state.snackbarData.text = data.text;
            }
            if (data.timeOut) {
                state.snackbarData.timeOut = data.timeOut;
            }
            if (data.color) {
                state.snackbarData.color = data.color;
            }
            if (data.closeBtnText) {
                state.snackbarData.closeBtnText = data.closeBtnText;
            }
            if (data.closeBtnColor) {
                state.snackbarData.closeBtnColor = data.closeBtnColor;
            }
            state.snackbarData.active = true;
        }, 50);

    }
};
export default {
    state,
    getters,
    actions,
    mutations,
};