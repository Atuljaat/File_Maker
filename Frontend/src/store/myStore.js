import { create } from 'zustand';

const useMyStore = create((set)=>({
    darkmode : localStorage.getItem('darkmode') === 'true' || false,
    changeMode : () => set((state) => ({
        darkmode : !state.darkmode
    }))

}))

export default useMyStore;