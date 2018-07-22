package cttd.quartz;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

public class QuartzDemo {

	private static final String TRIGGER = "BILLY_TRIGGER";
	private static final String JOB = "BILLY_JOB";
	private static final String GROUP = "BILLY_GRP";

	public static void main(String[] args) throws Exception {
		String intervalMonitorBilly = "0 0/1 * 1/1 * ? *";
		String urlConfig = "vnexpress.net - Báo điện tử Việt Nam được truy cập nhiều nhất";

		JobDetail job = JobBuilder.newJob(DemoJob.class).withIdentity(JOB, GROUP).build();
		Trigger trigger = TriggerBuilder.newTrigger().withIdentity(TRIGGER, GROUP)
				.withSchedule(CronScheduleBuilder.cronSchedule(intervalMonitorBilly)).build();

		Scheduler scheduler = new StdSchedulerFactory().getScheduler();
		scheduler.getContext().put("urlConfig", urlConfig);
		scheduler.start();
		scheduler.scheduleJob(job, trigger);
	}
}
