import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Lock,
    Phone,
    Shield,
    ArrowRight,
    Bot,
} from 'lucide-react';
import API from '../api/axios';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'customer',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/register', formData);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main Container with MongoDB Dark Forest Background [cite: 12, 89]
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#001E2B] relative overflow-hidden">
            
            {/* Visual Depth: Aesthetic Radial Gradients [cite: 44, 89] */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#00ED64] opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#00684A] opacity-30 blur-[100px] rounded-full"></div>

            <div className="w-full max-w-[500px] z-10">
                <div className="bg-white rounded-2xl shadow-2xl border border-white/10 p-8 md:p-12">
                    
                    {/* Branding: Leaf Green accents [cite: 35, 60] */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#00ED64] p-2 rounded-lg shadow-lg shadow-green-500/20">
                            <Bot className="w-6 h-6 text-[#001E2B]" />
                        </div>
                        <span className="font-bold text-[#001E2B] text-xl tracking-tight">AI Manufacturing</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500 text-sm">Join the AI-powered manufacturing platform</p>
                    </div>

                    <form onSubmit={registerHandler} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm">
                                {error}
                            </div>
                        )}

                        {/* Labels: professional Cloud Console look [cite: 36, 90] */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00ED64] transition-colors" />
                                <input 
                                    type="text" name="name" value={formData.name} onChange={changeHandler} required
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#00ED64] focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00ED64] transition-colors" />
                                <input 
                                    type="email" name="email" value={formData.email} onChange={changeHandler} required
                                    placeholder="name@company.com"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#00ED64] focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Responsive Grid: Prevents squishing on Phone and Role fields  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00ED64] transition-colors" />
                                    <input 
                                        type="text" name="phone" value={formData.phone} onChange={changeHandler}
                                        placeholder="123-456-7890"
                                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#00ED64] focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Role</label>
                                <div className="relative group">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00ED64] transition-colors" />
                                    <select 
                                        name="role" value={formData.role} onChange={changeHandler}
                                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#00ED64] transition-all text-sm appearance-none cursor-pointer text-slate-700 font-medium"
                                    >
                                        <option value="customer">Customer</option>
                                        
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00ED64] transition-colors" />
                                <input 
                                    type="password" name="password" value={formData.password} onChange={changeHandler} required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#00ED64] focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Signature Green Button [cite: 12, 15] */}
                        <button 
                            type="submit" disabled={loading}
                            className="w-full bg-[#00684A] hover:bg-[#001E2B] text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 mt-2"
                        >
                            {loading ? 'Creating Account...' : (<>Register <ArrowRight className="w-4 h-4" /></>)}
                        </button>

                        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
                            Already have an account? 
                            <button type="button" onClick={() => navigate('/login')} className="text-[#00684A] font-bold ml-1 hover:underline">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;