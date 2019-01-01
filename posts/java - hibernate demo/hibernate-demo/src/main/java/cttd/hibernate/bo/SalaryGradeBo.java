package cttd.hibernate.bo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Salary_Grade")
public class SalaryGradeBo {

    private Long salaryGradeId;
    private Long highSalary;
    private Long lowSalary;

    public SalaryGradeBo() {
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "salary_grade_id")
    public Long getSalaryGradeId() {
        return salaryGradeId;
    }

    public void setSalaryGradeId(Long salaryGradeId) {
        this.salaryGradeId = salaryGradeId;
    }

    @Column(name = "high_salary")
    public Long getHighSalary() {
        return highSalary;
    }

    public void setHighSalary(Long highSalary) {
        this.highSalary = highSalary;
    }

    @Column(name = "low_salary")
    public Long getLowSalary() {
        return lowSalary;
    }

    public void setLowSalary(Long lowSalary) {
        this.lowSalary = lowSalary;
    }
}
