import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TasksPage() {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const {data: tasks} = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id);
    console.log(typeof tasks)

    return (
        <div className="flex gap-4">
        {(tasks && tasks.length > 1) && tasks?.map(task => (
            <section key={task.id} className="border-2 border-gray rounded-xl p-4">
                <h1>{task.title}</h1>
                <p>{task.description}</p>
            </section>
        ))}
        </div>
    )
}