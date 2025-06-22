import { create } from 'zustand';

const useMyStore = create((set)=>({
    darkmode : localStorage.getItem('darkmode') === 'true' || false,
    changeMode : () => set((state) => {
        let newMode = !state.darkmode;
        localStorage.setItem('darkmode', newMode);
        return { darkmode: newMode }; 
    }
)

}))

export default useMyStore;