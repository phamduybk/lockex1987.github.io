package cttd.quartz;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;
import org.quartz.SchedulerContext;
import org.quartz.SchedulerException;

@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class DemoJob implements Job {

	public static final String URL_CONFIG = "urlConfig";

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			SchedulerContext schedulerContext = context.getScheduler().getContext();
			String urlConfig = (String) schedulerContext.get(URL_CONFIG);
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println(dateFormat.format(new Date()) + ": " + urlConfig);
		} catch (SchedulerException ex) {
			ex.printStackTrace();
		}
	}
}
